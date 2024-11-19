package com.app.services;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.app.entities.Vegetables;
import com.app.repository.VegetablesRepository;

@Service
@Transactional
public class VegetablesServiceImpl implements  VegetablesService{

	@Autowired
	private VegetablesRepository vegetableRepo;
	@Override
	public Vegetables create(Vegetables v) {
		
		return vegetableRepo.save(v);
	}

	@Override
	public Vegetables update(Vegetables v) {
		
		return vegetableRepo.save(v);
	}

	@Override
	public List<Vegetables> getAll() {
		List<Vegetables> vlist=vegetableRepo.findAll();
		return vlist;
	}

	@Override
	public void delete(Long id) {
		vegetableRepo.deleteById(id);
		
	}

}
