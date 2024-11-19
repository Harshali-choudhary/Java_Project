package com.app.services;

import java.util.List;

import com.app.entities.Vegetables;

public interface VegetablesService {

	Vegetables create(Vegetables v);
	Vegetables update(Vegetables v);
	List<Vegetables> getAll();
	void delete(Long id);
}
