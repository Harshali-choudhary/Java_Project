package com.app.services;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.app.entities.User;
import com.app.repository.UserRepository;

@Service
@Transactional
public class UserServiceImpl implements UserService{
	@Autowired
	private UserRepository UserRpo;

	@Override
	public User Insert(User u) {
		
		return UserRpo.save(u);
	}

	@Override
	public List<User> GetAll() {
		
		return UserRpo.findAll();
	}

	@Override
	public User Update(User u) {
		
		return UserRpo.save(u);
	}

	@Override
	public void Delete(Long id) {
		
		UserRpo.deleteById(id);
	}

}
