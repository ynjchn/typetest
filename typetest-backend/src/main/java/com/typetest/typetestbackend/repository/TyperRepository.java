package com.typetest.typetestbackend.repository;

import com.typetest.typetestbackend.model.Typer;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TyperRepository extends JpaRepository<Typer, Long> {
}
