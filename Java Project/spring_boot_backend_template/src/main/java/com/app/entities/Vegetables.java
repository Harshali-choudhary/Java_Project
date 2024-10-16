package com.app.entities;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class Vegetables {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name="vegetable_id")
	private Long Vegetable_id;
	@Column(name="image_url")
	private String image_url;
	@Column(name="vegetable_name")
	private String Vegetable_name;
	@Column(name="price")
	private double price;
	@Column(name="quantity")
	private int quantity;
	
	public Vegetables()
	{
		
	}

	public Vegetables(Long vegetable_id, String image_url, String vegetable_name, double price, int quantity) {
		Vegetable_id = vegetable_id;
		this.image_url = image_url;
		Vegetable_name = vegetable_name;
		this.price = price;
		this.quantity = quantity;
	}

	public Vegetables(String image_url, String vegetable_name, double price, int quantity) {
		this.image_url = image_url;
		Vegetable_name = vegetable_name;
		this.price = price;
		this.quantity = quantity;
	}

	public Long getVegetable_id() {
		return Vegetable_id;
	}

	public void setVegetable_id(Long vegetable_id) {
		Vegetable_id = vegetable_id;
	}

	public String getImage_url() {
		return image_url;
	}

	public void setImage_url(String image_url) {
		this.image_url = image_url;
	}

	public String getVegetable_name() {
		return Vegetable_name;
	}

	public void setVegetable_name(String vegetable_name) {
		Vegetable_name = vegetable_name;
	}

	public double getPrice() {
		return price;
	}

	public void setPrice(double price) {
		this.price = price;
	}

	public int getQuantity() {
		return quantity;
	}

	public void setQuantity(int quantity) {
		this.quantity = quantity;
	}

	@Override
	public String toString() {
		return "Vegetables [Vegetable_id=" + Vegetable_id + ", image_url=" + image_url + ", Vegetable_name="
				+ Vegetable_name + ", price=" + price + ", quantity=" + quantity + "]";
	}
	
	
}
