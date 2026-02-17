package cl.josefaogalde.demo.controller;

import cl.josefaogalde.demo.model.Item;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.concurrent.atomic.AtomicLong;

/**
 * Controlador REST para el recurso Item.
 * GET /api/items - listar todos
 * GET /api/items/{id} - obtener uno
 * POST /api/items - crear (body JSON: name, description)
 */
@RestController
@RequestMapping("/api/items")
@CrossOrigin(originPatterns = "*") // permite que el cliente JS en otro puerto consuma la API
public class ItemController {

    private final List<Item> items = new ArrayList<>();
    private final AtomicLong idGenerator = new AtomicLong(1);

    public ItemController() {
        items.add(new Item(idGenerator.getAndIncrement(), "Item inicial", "Creado al arrancar la API"));
    }

    @GetMapping
    public List<Item> getAll() {
        return items;
    }

    @GetMapping("/{id}")
    public ResponseEntity<Item> getById(@PathVariable Long id) {
        Optional<Item> found = items.stream().filter(i -> i.getId().equals(id)).findFirst();
        return found.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Item> create(@RequestBody Item item) {
        if (item.getName() == null || item.getName().isBlank()) {
            return ResponseEntity.badRequest().build();
        }
        Item newItem = new Item(idGenerator.getAndIncrement(), item.getName(), item.getDescription());
        items.add(newItem);
        return ResponseEntity.status(HttpStatus.CREATED).body(newItem);
    }
}
