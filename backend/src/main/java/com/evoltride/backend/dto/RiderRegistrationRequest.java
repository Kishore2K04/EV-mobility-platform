package com.evoltride.backend.dto;

import lombok.Data;

@Data
public class RiderRegistrationRequest {

    private String fullName;

    private String email;

    private String phoneNumber;

    private String password;

}