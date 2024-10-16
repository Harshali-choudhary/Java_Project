package com.app.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.app.entities.Vegetables;

@Repository
public interface VegetablesRepository extends JpaRepository<Vegetables, Long>{

}
