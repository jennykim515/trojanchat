package trojanchat.backend;

import java.util.List;
import java.util.Set;
import java.util.ArrayList;
import java.util.concurrent.RecursiveTask;

import ch.qos.logback.core.filter.Filter;
import trojanchat.backend.controllers.PostController;
import trojanchat.backend.models.Post;

public class FilterThread extends RecursiveTask<List<Post>> {
    private String tag;
    private String school;
    private Set<String> queryIds;
    private PostController postRepo;

    public FilterThread(String tag, String school, Set<String> queryIds, PostController postRepo) {
        this.tag = tag;
        this.school = school;
        this.postRepo = postRepo;
    }

    protected List<Post> compute() {
        List<Post> queried = postRepo.findPostBySchoolAndFilter(school, tag);
        List<Post> result = new ArrayList<>();

        for(Post post : queried) {
            if(!queryIds.contains(post.getPostId())) {
                result.add(post);
                queryIds.add(post.getPostId());
            }
        }
        return result;
    }
}
