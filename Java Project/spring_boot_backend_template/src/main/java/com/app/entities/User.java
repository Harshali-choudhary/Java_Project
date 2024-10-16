package com.app.entities;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.UniqueConstraint;

import com.fasterxml.jackson.annotation.JsonProperty;

@Entity
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="user_id")
    private long user_id;

    @Column(name = "first_Name")
    @JsonProperty("first_name")
    private String first_name;

    @Column(name = "last_Name")
    @JsonProperty("last_name")
    private String last_name;

    @Column(name = "email",unique = true)
    @JsonProperty("email")
    private String email;

    @Column(name = "password")
    @JsonProperty("password")
    private String password;

    @Enumerated(EnumType.STRING)
    @JsonProperty("role")
    private Role role;

    @Column(name = "mobile_no")
    @JsonProperty("mobile_no")
    private String mobile_no;

  
    public User() {
    }

    
    public User(String first_Name, String last_Name, String email, String password, Role role, String mobile_no) {
        this.first_name = first_Name;
        this.last_name = last_Name;
        this.email = email;
        this.password = password;
        this.role = role;
        this.mobile_no = mobile_no;
    }

 
    public User(long userId, String first_Name, String last_Name, String email, String password, Role role, String mobile_no) {
        this.user_id= userId;
        this.first_name = first_Name;
        this.last_name = last_Name;
        this.email = email;
        this.password = password;
        this.role = role;
        this.mobile_no = mobile_no;
    }

    // Getters and Setters

    public long getUser_id() {
        return user_id;
    }

    public void setUser_id(long user_id) {
        this.user_id = user_id;
    }

    public String getFirstName() {
        return first_name;
    }

    public void setFirstName(String firstName) {
        this.first_name = firstName;
    }

    public String getLastName() {
        return last_name;
    }

    public void setLastName(String lastName) {
        this.last_name = lastName;
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

    public Role getRole() {
        return role;
    }

    public void setRole(Role role) {
        this.role = role;
    }

    public String getMobileNo() {
        return mobile_no;
    }

    public void setMobileNo(String mobileNo) {
        this.mobile_no = mobileNo;
    }

    // toString method
    @Override
    public String toString() {
        return "User [userId=" + user_id + ", firstName=" + first_name + ", lastName=" + last_name 
                + ", email=" + email + ", password=" + password + ", role=" + role + ", mobileNo=" + mobile_no + "]";
    }
}
