package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.domain.Comentario;
import com.mycompany.myapp.repository.ComentarioRepository;
import com.mycompany.myapp.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link com.mycompany.myapp.domain.Comentario}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class ComentarioResource {

    private final Logger log = LoggerFactory.getLogger(ComentarioResource.class);

    private static final String ENTITY_NAME = "comentario";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final ComentarioRepository comentarioRepository;

    public ComentarioResource(ComentarioRepository comentarioRepository) {
        this.comentarioRepository = comentarioRepository;
    }

    /**
     * {@code POST  /comentarios} : Create a new comentario.
     *
     * @param comentario the comentario to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new comentario, or with status {@code 400 (Bad Request)} if the comentario has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/comentarios")
    public ResponseEntity<Comentario> createComentario(@Valid @RequestBody Comentario comentario) throws URISyntaxException {
        log.debug("REST request to save Comentario : {}", comentario);
        if (comentario.getId() != null) {
            throw new BadRequestAlertException("A new comentario cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Comentario result = comentarioRepository.save(comentario);
        return ResponseEntity.created(new URI("/api/comentarios/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /comentarios} : Updates an existing comentario.
     *
     * @param comentario the comentario to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated comentario,
     * or with status {@code 400 (Bad Request)} if the comentario is not valid,
     * or with status {@code 500 (Internal Server Error)} if the comentario couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/comentarios")
    public ResponseEntity<Comentario> updateComentario(@Valid @RequestBody Comentario comentario) throws URISyntaxException {
        log.debug("REST request to update Comentario : {}", comentario);
        if (comentario.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Comentario result = comentarioRepository.save(comentario);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, comentario.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /comentarios} : get all the comentarios.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of comentarios in body.
     */
    @GetMapping("/comentarios")
    public List<Comentario> getAllComentarios() {
        log.debug("REST request to get all Comentarios");
        return comentarioRepository.findAll();
    }

    /**
     * {@code GET  /comentarios/:id} : get the "id" comentario.
     *
     * @param id the id of the comentario to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the comentario, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/comentarios/{id}")
    public ResponseEntity<Comentario> getComentario(@PathVariable Long id) {
        log.debug("REST request to get Comentario : {}", id);
        Optional<Comentario> comentario = comentarioRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(comentario);
    }

    /**
     * {@code DELETE  /comentarios/:id} : delete the "id" comentario.
     *
     * @param id the id of the comentario to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/comentarios/{id}")
    public ResponseEntity<Void> deleteComentario(@PathVariable Long id) {
        log.debug("REST request to delete Comentario : {}", id);
        comentarioRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
