package trojanchat.backend.controllers;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.google.gson.Gson;
import com.mongodb.MongoException;

import trojanchat.backend.models.Comment;
import trojanchat.backend.models.Post;
import trojanchat.backend.models.User;

@Controller
public class APIController {
	@Autowired
	UserController userRepo;
	
	@Autowired
	CommentController commentRepo;
	
	@Autowired
	PostController postRepo;
	
	User defaultUser = new User("none", "none", "none", "none", "none", 0, new ArrayList<String>());
	Post defaultPost = new Post("none", "none", "none", "none", "none", new String[] {}, 0, 0);
	Comment defaultComment = new Comment("none", "none", "none", "none", "none");
	Gson gson = new Gson();
	
//	<-		GET REQUESTS		->
	
//	<-		ACCOUNT VIEW		->
	@CrossOrigin
	@RequestMapping("/api/account/view")
    @ResponseBody
    public ResponseEntity<String> accountView(@RequestParam Map<String,String> allParams) {
		String userId = allParams.get("id");
		User user = defaultUser;
		try {
			user = userRepo.findUserById(userId);
		} catch(MongoException e) {
			System.out.println(e.getMessage());
		}
		return ResponseEntity.ok(gson.toJson(user).toString());
	}
	
// <-		ACCOUNT POSTS		->
	@CrossOrigin
	@RequestMapping("/api/account/posts")
    @ResponseBody
    public ResponseEntity<String> accountPosts(@RequestParam Map<String,String> allParams) {
		String userId = allParams.get("id");
		User user = defaultUser;
		List<Post> posts = new ArrayList<>();
		try {
			user = userRepo.findUserById(userId);
			for(String postId : user.getPosts()) {
				Post post = postRepo.findPostById(postId);
				posts.add(post);
			}
		} catch(MongoException e) {
			System.out.println(e.getMessage());
		}
		return ResponseEntity.ok(gson.toJson(posts).toString());
	}

//	<-		ACCOUNT COMMENTS		->
	@CrossOrigin
	@RequestMapping("/api/account/comments")
    @ResponseBody
    public ResponseEntity<String> accountComments(@RequestParam Map<String,String> allParams) {
		String userId = allParams.get("id");
		List<Comment> comments = new ArrayList<>();
		try {
			comments = commentRepo.findCommentsByUserId(userId);
		} catch (MongoException e) {
			System.out.println(e.getMessage());
		}
		return ResponseEntity.ok(gson.toJson(comments).toString());
	}
	
//	<-		FEED HOME		->
	@CrossOrigin
	@RequestMapping("/api/feed/home")
    @ResponseBody
    public ResponseEntity<String> feedHome(@RequestParam Map<String,String> allParams) {
		String[] schools = allParams.get("schools").split(",");
		HashMap<String, Integer> homeFeed = new HashMap<>();
		for(String school : schools) {
			try {
				List<Post> posts;
				if(school.equals("all")) {
					posts = postRepo.findAll();
					homeFeed.put(school, (int) postRepo.count());
				} else {
					posts = postRepo.findPostBySchool(school);
					homeFeed.put(school, posts.size());
				}
			} catch(MongoException e) {
				System.out.println(e.getMessage());
			}
		}
		return ResponseEntity.ok(gson.toJson(homeFeed).toString());
	}
	
//	<-		FEED HOME		->
	@CrossOrigin
	@RequestMapping("/api/feed/board")
    @ResponseBody
    public ResponseEntity<String> feedBoard(@RequestParam Map<String,String> allParams) {
		String school = allParams.get("school");
		String filter = allParams.get("filter");
		List<Post> posts = new ArrayList<>();
		if(school.equals("all")) {
			if(!filter.equals("_none")) {
				try {
					String[] filters = filter.split(",");
					Set<String> queryIds = new HashSet<>();
					List<Post> total = postRepo.findAll();
					for(String tag : filters) {
						List<Post> queried = new ArrayList<>();
						List<Post> result = new ArrayList<>();
						total.forEach(e ->{
							if(e.hasTag(tag)) {
								queried.add(e);
							}
						});
						
						for(Post post : queried) {
							if(!queryIds.contains(post.getPostId())) {
								result.add(post);
								queryIds.add(post.getPostId());
							}
						}
						posts.addAll(result);
					}
					
				} catch(MongoException e) {
					System.out.println(e.getMessage());
				}
			} else {
				posts.addAll(postRepo.findAll());
			}
		} else {
			if(!filter.equals("_none")) {
				try {
					String[] filters = filter.split(",");
					Set<String> queryIds = new HashSet<>();
					for(String tag : filters) {
						List<Post> queried = postRepo.findPostBySchoolAndFilter(school, tag);
						List<Post> result = new ArrayList<>();
						
						for(Post post : queried) {
							if(!queryIds.contains(post.getPostId())) {
								result.add(post);
								queryIds.add(post.getPostId());
							}
						}
						posts.addAll(result);
					}
					
				} catch(MongoException e) {
					System.out.println(e.getMessage());
				}
			} else {
				try {
					posts = postRepo.findPostBySchool(school);
				} catch(MongoException e) {
					System.out.println(e.getMessage());
				}
			}
		}
		return ResponseEntity.ok(gson.toJson(posts).toString());
	}
	
//	<-		POST VIEW		->
	@CrossOrigin
	@RequestMapping("/api/post/view")
    @ResponseBody
    public ResponseEntity<String> postView(@RequestParam Map<String,String> allParams) {
		String postId = allParams.get("postId");
		Post post = defaultPost;
		
		HashMap<String, Object> postView = new HashMap<>();
		try {
			post = postRepo.findPostById(postId);
			List<Comment> comments = commentRepo.findCommentsByPostId(postId);
			postView.put("post", post);
			postView.put("comments", comments);
		} catch (MongoException e) {
			System.out.println(e.getMessage());
		}
		return ResponseEntity.ok(gson.toJson(postView).toString());
	}
	
//	<-		ACCOUNT COMMENTS		->
	@CrossOrigin
	@RequestMapping("/api/account/verify")
    @ResponseBody
    public ResponseEntity<String> verifyUsername(@RequestParam Map<String,String> allParams) {
		String username = allParams.get("username");
		String password = allParams.get("password");
		User user = defaultUser;
		try {
			user = userRepo.verifyUser(username, password);
		} catch (MongoException e) {
			System.out.println(e.getMessage());
		}
		return ResponseEntity.ok(gson.toJson(user).toString());
	}
	
//	<-		CPD REQUESTS		->
	
//	<-		CREATE ACCOUNT		->
	@CrossOrigin
	@PostMapping("/api/account/create")
	public ResponseEntity<String> createAccount(@RequestBody User user){
		User toFind = userRepo.findUserByUsername(user.getUsername());
		if(toFind != null) {
			return ResponseEntity.ok(gson.toJson("null"));
		}
		userRepo.save(user);
		return ResponseEntity.ok(gson.toJson(user));
	}
	
//	<-		UPDATE ACCOUNT		->
	@CrossOrigin
	@PutMapping("/api/account/update")
	public ResponseEntity<String> updateAccount(@RequestBody User user){
		User toFind = userRepo.findUserById(user.getUserId());
		if(toFind == null) {
			return ResponseEntity.ok(gson.toJson("null"));
		}
		toFind.setEmail(user.getEmail());
		toFind.setGraduationYear(user.getGraduationYear());
		toFind.setMajor(user.getMajor());
		toFind.setPosts(user.getPosts());
		toFind.setPassword(user.getPassword());
		toFind.setUsername(user.getUsername());
		userRepo.save(toFind);
		return ResponseEntity.ok(gson.toJson(user));
	}
	
//	<-		CREATE POST		->
	@CrossOrigin
	@PostMapping("/api/post/create")
	public ResponseEntity<String> createPost(@RequestBody Post post){
		
		User user = userRepo.findUserById(post.getUserId());
		user.addPost(post.getPostId());
		userRepo.save(user);
		postRepo.save(post);
		return ResponseEntity.ok(gson.toJson(post));
	}
	
//	<-		UPDATE POST		->
	@CrossOrigin
	@PutMapping("/api/post/update")
	public ResponseEntity<String> updatePost(@RequestBody Post post){
		Post toFind = postRepo.findPostById(post.getPostId());
		if(toFind == null) {
			return ResponseEntity.ok(gson.toJson("null"));
		}
		toFind.setTags(post.getTags());
		toFind.setContent(post.getContent());
		toFind.setSchool(post.getSchool());
		postRepo.save(toFind);
		return ResponseEntity.ok(gson.toJson(post));
	}
	
//	<-		CREATE COMMENT		->
	@CrossOrigin
	@PostMapping("/api/comment/create")
	public ResponseEntity<String> createComment(@RequestBody Comment comment){
		commentRepo.save(comment);
		Post post = postRepo.findPostById(comment.getPostId());
		post.addComment();
		postRepo.save(post);
		return ResponseEntity.ok(gson.toJson(comment));
	}
	
//	<-		UPDATE COMMENT		->
	@CrossOrigin
	@PutMapping("/api/comment/update")
	public ResponseEntity<String> updateComment(@RequestBody Comment comment){
		Comment toFind = commentRepo.findCommentById(comment.getCommentId());
		if(toFind == null) {
			return ResponseEntity.ok(gson.toJson("null"));
		}
		comment.setContent(comment.getContent());
		commentRepo.save(toFind);
		return ResponseEntity.ok(gson.toJson(comment));
	}
	
//	<-		UP/DOWNVOTE POST		->
	@CrossOrigin
	@PostMapping("/api/post/vote")
	public ResponseEntity<String> votePost(@RequestParam Map<String,String> allParams) {
		String postId = allParams.get("postId");
		String vote = allParams.get("vote");
		Post post = postRepo.findPostById(postId);
		if(post == null) {
			return ResponseEntity.ok(gson.toJson("null"));
		}
		if(vote.equals("up")) {
			post.upvote();
		} else {
			post.downvote();
		}
		postRepo.save(post);
		return ResponseEntity.ok("voted");
	}
	
	
//	<-		DELETE POST	->
	@CrossOrigin
	@DeleteMapping("/api/post/delete")
	public ResponseEntity<String> deletePost(@RequestParam Map<String,String> allParams) {
		String postId = allParams.get("postId");
		Post post = postRepo.findPostById(postId);
		
		if(post == null) {
			return ResponseEntity.ok(gson.toJson("null"));
		}
		User user = userRepo.findUserById(post.getUserId());
		if(user != null) {
			user.removePost(postId);
			userRepo.save(user);
		}
		postRepo.delete(post);
		return ResponseEntity.ok("deleted");
	}
	
//	<-		DELETE COMMENT	->
	@CrossOrigin
	@DeleteMapping("/api/comment/delete")
	public ResponseEntity<String> deleteComment(@RequestParam Map<String,String> allParams) {
		String commentId = allParams.get("commentId");
		Comment comment = commentRepo.findCommentById(commentId);
		if(comment == null) {
			return ResponseEntity.ok(gson.toJson("null"));
		}
		Post post = postRepo.findPostById(comment.getPostId());
		post.removeComment();
		postRepo.save(post);
		commentRepo.delete(comment);
		return ResponseEntity.ok("deleted");
	}
	
//	<-		DELETE USER	->
	@CrossOrigin
	@DeleteMapping("/api/account/delete")
	public ResponseEntity<String> deleteUser(@RequestParam Map<String,String> allParams) {
		String userId = allParams.get("id");
		User user = userRepo.findUserById(userId);
		if(user == null) {
			return ResponseEntity.ok(gson.toJson("null"));
		}
//		Delete Comments
		List<Comment> comments = commentRepo.findCommentsByUserId(userId);
		for(Comment comment : comments) {
			Post post = postRepo.findPostById(comment.getPostId());
			post.removeComment();
			postRepo.save(post);
			commentRepo.delete(comment);
		}
//		Delete Posts
		List<String> posts = user.getPosts();
		for(String s : posts) { 
			Post post = postRepo.findPostById(s);
			if(post != null) {
				postRepo.delete(post);
			}
		}
//		Delete User
		userRepo.delete(user);
		return ResponseEntity.ok("deleted");
	}
}
