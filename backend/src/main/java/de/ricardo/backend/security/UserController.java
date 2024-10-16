package de.ricardo.backend.security;

import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
public class UserController {

    @GetMapping("/me")
    public String getMe(@AuthenticationPrincipal OAuth2User user) {
        return user != null ? user.getAttributes().get("login").toString() : "anonymousUser";
    }

    @GetMapping("/me2")
    public String getCurrentUser() {
        return SecurityContextHolder.getContext().getAuthentication().getName(); // returns GitHub Id
    }
}
