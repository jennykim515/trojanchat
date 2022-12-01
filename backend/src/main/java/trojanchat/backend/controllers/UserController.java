package trojanchat.backend.controllers;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.data.repository.query.Param;

import trojanchat.backend.models.User;

public interface UserController extends MongoRepository<User, String> {
	
	@Query("{userId:'?0'}")
	User findUserById(String userId); 
	
	@Query("{username: :#{#username}, password: :#{#password}}")
	User verifyUser(@Param("username") String username, @Param("password") String password);
	
	public long count();
}
