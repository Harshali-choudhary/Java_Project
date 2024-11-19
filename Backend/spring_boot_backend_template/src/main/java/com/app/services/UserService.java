package com.app.services;

import java.util.List;

import com.app.entities.User;

public interface UserService {

	User Insert(User u);
	List<User> GetAll();
	User Update(User u);
	void Delete(Long id);
}
