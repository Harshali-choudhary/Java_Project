package com.app.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.app.entities.User;
import com.app.services.UserService;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/User")
public class UserController {

    @Autowired
    private UserService userSer;

    @PostMapping("insert")
    public ResponseEntity<String> insert(@RequestBody User u) {
        try {
            User user = userSer.Insert(u);
            return ResponseEntity.ok("User inserted successfully: " + user);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                                 .body("User registration failed: " + e.getMessage());
        }
    }

    @GetMapping("getAll")
    public ResponseEntity<List<User>> getAll() {
        List<User> list = userSer.GetAll();
        return ResponseEntity.ok(list);
    }

    @PutMapping("update")
    public ResponseEntity<String> update(@RequestBody User user) {
        User updatedUser = userSer.Update(user);
        return ResponseEntity.ok("User updated successfully: " + updatedUser);
    }

    @DeleteMapping("delete")
    public ResponseEntity<String> delete(@RequestParam Long id) {
        userSer.Delete(id);
        return ResponseEntity.ok("User deleted successfully");
    }
 
    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody User loginRequest) {
        User user = userSer.validateUser(loginRequest);
        
        if (user != null) {
            return ResponseEntity.ok(user); // Return the user object on successful login
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid email or password");
        }
    }
} 