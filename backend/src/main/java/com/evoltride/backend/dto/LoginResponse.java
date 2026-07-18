package com.evoltride.backend.dto;

public class LoginResponse {

    private String message;
    private String role;
    private String email;
    private String fullName;

    public LoginResponse() {}

    public LoginResponse(String message, String role, String email, String fullName) {
        this.message = message;
        this.role = role;
        this.email = email;
        this.fullName = fullName;
    }

    public String getMessage() { return message; }
    public void setMessage(String message) { this.message = message; }

    public String getRole() { return role; }
    public void setRole(String role) { this.role = role; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getFullName() { return fullName; }
    public void setFullName(String fullName) { this.fullName = fullName; }
}