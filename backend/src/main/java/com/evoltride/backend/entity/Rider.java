package com.evoltride.backend.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "riders")
@Data
public class Rider {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String fullName;

    @Column(nullable = false, unique = true)
    private String email;

    @Column(nullable = false)
    private String phoneNumber;

    @Column(nullable = false)
    private String password;

    private Double walletBalance = 0.0;
}