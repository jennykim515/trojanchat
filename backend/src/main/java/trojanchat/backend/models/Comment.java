package trojanchat.backend.models;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document("comments")
public class Comment {
	@Id
	private String commentId;
	
	private String postId;
	private String userId;
	private String content;
	private String timestamp;
	
	public Comment(String commentId, String postId, String userId, String content, String timestamp) {
		super();
		this.commentId=commentId;
		this.postId=postId;
		this.userId=userId;
		this.content=content;
		this.timestamp=timestamp;
	}

	public String getCommentId() {
		return commentId;
	}

	public void setCommentId(String commentId) {
		this.commentId = commentId;
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
	
	

}
