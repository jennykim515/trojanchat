package trojanchat.backend.models;

import java.util.List;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document("users")
public class User {
	@Id
	private String userId;
	
	private String username;
	private String email;
	private String password;
	private String major;
	private int graduationYear;
	private List<String> posts;
	
	public User(String userId, String username, String email, String password, String major, int graduationYear, List<String> posts) {
		super();
		this.userId=userId;
		this.username=username;
		this.email=email;
		this.password=password;
		this.major=major;
		this.graduationYear=graduationYear;
		this.posts=posts;
	}

	public String getUserId() {
		return userId;
	}

	public void setUserId(String userId) {
		this.userId = userId;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getMajor() {
		return major;
	}

	public void setMajor(String major) {
		this.major = major;
	}

	public int getGraduationYear() {
		return graduationYear;
	}

	public void setGraduationYear(int graduationYear) {
		this.graduationYear = graduationYear;
	}

	public List<String> getPosts() {
		return posts;
	}

	public void setPosts(List<String> posts) {
		this.posts = posts;
	}

	public void addPost(String post) {
		if(getPosts().contains(post)) {
			return;
		}
		getPosts().add(post);
	}
	
	public void removePost(String post) {
		if(!getPosts().contains(post)) {
			return;
		}
		getPosts().remove(post);
	}
}
