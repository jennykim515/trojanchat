package trojanchat.backend.controllers;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.data.repository.query.Param;

import trojanchat.backend.models.Post;

public interface PostController extends MongoRepository<Post, String> {
	
	@Query("{postId:'?0'}")
	Post findPostById(String postId); 
	
	@Query("{school:'?0'}")
	List<Post> findPostBySchool(String school); 
	
	@Query("{school: :#{#school}, tags: {$in: [:#{#tags}]}}")
	List<Post> findPostBySchoolAndFilter(@Param("school") String school, @Param("tags") String tags);
	
	public long count();

}
