package trojanchat.backend;

//import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.mongodb.repository.config.EnableMongoRepositories;

import trojanchat.backend.controllers.PostController;
//import trojanchat.backend.models.Post;

@SpringBootApplication
@EnableMongoRepositories
public class BackendApplication implements CommandLineRunner {
	@Autowired
	PostController postRepo;

	public static void main(String[] args) {
		SpringApplication.run(BackendApplication.class, args);
	}

	@Override
	public void run(String... args) throws Exception {
//		postRepo.deleteAll();
//		postRepo.save(new Post(UUID.randomUUID().toString(), "uuidHere", "Some text here", "timestamp", "viterbi", new String[] {"cs", "201"}, 0, 0));
	}

}
