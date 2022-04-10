package com.typetest.typetestbackend;

import com.typetest.typetestbackend.model.Typer;
import com.typetest.typetestbackend.repository.TyperRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.util.Arrays;

@SpringBootApplication
public class TypetestBackendApplication implements CommandLineRunner {

	public static void main(String[] args) {
		SpringApplication.run(TypetestBackendApplication.class, args);
	}

	@Autowired
	private TyperRepository typerRepository;

	@Override
	public void run(String... args) throws Exception {
//		Typer typer = new Typer();
//		typer.setUsername("bumbee");
//		typer.setSpeeds(Arrays.asList(1,2,3,4,5));
//		typerRepository.save(typer);
	}
}
