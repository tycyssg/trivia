package com.trivia.model;

import lombok.Data;

import javax.persistence.*;
import javax.validation.constraints.Email;
import java.io.Serializable;

@Data
@Entity
@Table(name="user")
public class User implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String username;
    @Email
    private String email;
    private String password;

    @Enumerated(EnumType.STRING)
    private Role role;
    private Long score;

    @Transient
    private String token;
}
