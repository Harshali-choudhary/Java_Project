package com.app.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.app.entities.Vegetables;
import com.app.services.VegetablesService;

@RestController
@RequestMapping("/Vgetables")
public class VegetableController {

	@Autowired
	private VegetablesService vegetableSer;
	
	@PostMapping("insert")
	public ResponseEntity<String> Insert(Vegetables v)
	{
	  Vegetables veg= vegetableSer.create(v);
	  return ResponseEntity.ok("Vegetable inserted "+veg);
	}
	
	@GetMapping("getall")
	public ResponseEntity<List<Vegetables>> GetAll()
	{
		List<Vegetables> Vlist = vegetableSer.getAll();
		return ResponseEntity.ok(Vlist);
	}
	
	@PutMapping("update")
	public ResponseEntity<String> Update(Vegetables v)
	{
		Vegetables veg = vegetableSer.update(v);
		return ResponseEntity.ok("Vegetable updated successfully "+veg);
	}
	
	@DeleteMapping("delete")
	public ResponseEntity<String> Delete(Long id)
	{
		vegetableSer.delete(id);
		return ResponseEntity.ok("Vegetable deleted successfully.");
	}
}
