package com.eunbi.PianoClass.common.util;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.User;

public class UserUtil {

    public static User getUser() {
        SecurityContext context = SecurityContextHolder.getContext();
        if( context.getAuthentication() != null
                && context.getAuthentication().isAuthenticated()
                && context.getAuthentication().getPrincipal() instanceof User) {
            return (User) context.getAuthentication().getPrincipal();
        }
        return null;
    }
}
