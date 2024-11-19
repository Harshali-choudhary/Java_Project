package com.app.entities;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="user_id")
    private long user_id;

    @Column(name = "first_Name")
    private String firstName;

    @Column(name = "last_Name")
    private String lastName;

    @Column(name = "email")
    private String email;

    @Column(name = "password")
    private String password;

    @Enumerated(EnumType.STRING)
    private Role role;

    @Column(name = "mobile_no")
    private String mobile_no;

  
    public User() {
    }

    
    public User(String firstName, String lastName, String email, String password, Role role, String mobile_no) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.password = password;
        this.role = role;
        this.mobile_no = mobile_no;
    }

 
    public User(long userId, String firstName, String lastName, String email, String password, Role role, String mobile_no) {
        this.user_id= userId;
        this.firstName = firstName;
        this.lastName = lastName;
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
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
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
        return "User [userId=" + user_id + ", firstName=" + firstName + ", lastName=" + lastName 
                + ", email=" + email + ", password=" + password + ", role=" + role + ", mobileNo=" + mobile_no + "]";
    }
}
