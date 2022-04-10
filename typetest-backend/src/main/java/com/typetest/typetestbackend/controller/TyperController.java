package com.typetest.typetestbackend.controller;

import com.typetest.typetestbackend.exception.ResourceNotFoundException;
import com.typetest.typetestbackend.model.Typer;
import com.typetest.typetestbackend.repository.TyperRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/v1/typers")
public class TyperController {

    @Autowired
    private TyperRepository typerRepository;

    @GetMapping
    public List<Typer> getAllTypers(){
        return typerRepository.findAll();
    }

    @PostMapping
    public Typer createTyper(@RequestBody Typer typer) {
        return typerRepository.save(typer);
    }

    @GetMapping("{id}")
    public ResponseEntity<Typer> getTyperById(@PathVariable long id) {
        Typer typer = typerRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User not exist with id:" + id));
        return ResponseEntity.ok(typer);
    }

    @PutMapping("{id}")
    public ResponseEntity<Typer> updateTyper(@PathVariable long id, @RequestBody Typer typerDetails) {
        Typer updateTyper = typerRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User not exist with id:" + id));

        updateTyper.setUsername(typerDetails.getUsername());
        updateTyper.setSpeeds(typerDetails.getSpeeds());
        typerRepository.save(updateTyper);

        return ResponseEntity.ok(updateTyper);
    }

    @DeleteMapping("{id}")
    public ResponseEntity<HttpStatus> deleteTyper(@PathVariable long id) {
        Typer typer = typerRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User not exist with id:" + id));

        typerRepository.delete(typer);

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

}
