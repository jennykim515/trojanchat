package trojanchat.backend.controllers;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import trojanchat.backend.models.Comment;

public interface CommentController extends MongoRepository<Comment, String> {
	
	@Query("{commentId:'?0'}")
	Comment findCommentById(String commentId); 
	
	@Query("{postId:'?0'}")
	List<Comment> findCommentsByPostId(String id);
	
	@Query("{userId:'?0'}")
	List<Comment> findCommentsByUserId(String id);
	
	

	public long count();
}
