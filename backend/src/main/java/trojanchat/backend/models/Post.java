package trojanchat.backend.models;

import java.util.Arrays;
import java.util.List;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document("posts")
public class Post {
	@Id
	private String postId;
	
//	Original Poster's User Id
	private String userId;
	private String content;
	private String timestamp;
	private String school;
	private String[] tags;
	private int upvotes;
	private int numComments;
	
	public Post(String postId, String userId, String content, String timestamp, String school, String[] tags, int upvotes, int numComments) {
		super();
		this.postId=postId;
		this.userId=userId;
		this.content=content;
		this.timestamp=timestamp;
		this.school=school;
		this.tags=tags;
		this.upvotes=upvotes;
		this.numComments=numComments;
	}

	public String getPostId() {
		return postId;
	}

	public void setPostId(String postId) {
		this.postId = postId;
	}

	public String getUserId() {
		return userId;
	}

	public void setUserId(String userId) {
		this.userId = userId;
	}

	public String getContent() {
		return content;
	}

	public void setContent(String content) {
		this.content = content;
	}

	public String getTimestamp() {
		return timestamp;
	}

	public void setTimestamp(String timestamp) {
		this.timestamp = timestamp;
	}

	public String getSchool() {
		return school;
	}

	public void setSchool(String school) {
		this.school = school;
	}

	public String[] getTags() {
		return tags;
	}

	public void setTags(String[] tags) {
		this.tags = tags;
	}
	
	public boolean hasTag(String tag) {
		for(String t : getTags()) {
			if(t.equals(tag)) {
				return true;
			}
		}
		return false;
	}
	
	public void addTag(String tag) {
		List<String> tags = Arrays.asList(getTags());
		if(tags.contains(tag)) return;
		tags.add(tag);
		setTags(tags.toArray(new String[0]));
	}
	
	public void removeTag(String tag) {
		List<String> tags = Arrays.asList(getTags());
		if(!tags.contains(tag)) return;
		tags.remove(tag);
		setTags(tags.toArray(new String[0]));
	}

	public int getUpvotes() {
		return upvotes;
	}
	
	public void downvote() {
		setUpvotes(getUpvotes() - 1);
	}
	
	public void upvote() {
		setUpvotes(getUpvotes() + 1);
	}

	public void setUpvotes(int upvotes) {
		this.upvotes = upvotes;
	}

	public int getNumComments() {
		return numComments;
	}

	public void setNumComments(int numComments) {
		this.numComments = numComments;
	}
	
	public void addComment() {
		setNumComments(getNumComments()+1);
	}
	
	public void removeComment() {
		setNumComments(getNumComments()-1);
	}
	
	@Override
	public String toString() {
		return "PostID: " + getPostId() + ", UserID: " + getUserId() + ", Content: " + getContent() + ", Tags: " + getTags();
	}

}
