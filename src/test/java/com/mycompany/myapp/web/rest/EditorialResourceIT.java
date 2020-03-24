package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.JhipsterSampleApplicationApp;
import com.mycompany.myapp.domain.Editorial;
import com.mycompany.myapp.repository.EditorialRepository;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;
import javax.persistence.EntityManager;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@link EditorialResource} REST controller.
 */
@SpringBootTest(classes = JhipsterSampleApplicationApp.class)

@AutoConfigureMockMvc
@WithMockUser
public class EditorialResourceIT {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    @Autowired
    private EditorialRepository editorialRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restEditorialMockMvc;

    private Editorial editorial;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Editorial createEntity(EntityManager em) {
        Editorial editorial = new Editorial()
            .name(DEFAULT_NAME);
        return editorial;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Editorial createUpdatedEntity(EntityManager em) {
        Editorial editorial = new Editorial()
            .name(UPDATED_NAME);
        return editorial;
    }

    @BeforeEach
    public void initTest() {
        editorial = createEntity(em);
    }

    @Test
    @Transactional
    public void createEditorial() throws Exception {
        int databaseSizeBeforeCreate = editorialRepository.findAll().size();

        // Create the Editorial
        restEditorialMockMvc.perform(post("/api/editorials").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(editorial)))
            .andExpect(status().isCreated());

        // Validate the Editorial in the database
        List<Editorial> editorialList = editorialRepository.findAll();
        assertThat(editorialList).hasSize(databaseSizeBeforeCreate + 1);
        Editorial testEditorial = editorialList.get(editorialList.size() - 1);
        assertThat(testEditorial.getName()).isEqualTo(DEFAULT_NAME);
    }

    @Test
    @Transactional
    public void createEditorialWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = editorialRepository.findAll().size();

        // Create the Editorial with an existing ID
        editorial.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restEditorialMockMvc.perform(post("/api/editorials").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(editorial)))
            .andExpect(status().isBadRequest());

        // Validate the Editorial in the database
        List<Editorial> editorialList = editorialRepository.findAll();
        assertThat(editorialList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllEditorials() throws Exception {
        // Initialize the database
        editorialRepository.saveAndFlush(editorial);

        // Get all the editorialList
        restEditorialMockMvc.perform(get("/api/editorials?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(editorial.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME)));
    }
    
    @Test
    @Transactional
    public void getEditorial() throws Exception {
        // Initialize the database
        editorialRepository.saveAndFlush(editorial);

        // Get the editorial
        restEditorialMockMvc.perform(get("/api/editorials/{id}", editorial.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(editorial.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME));
    }

    @Test
    @Transactional
    public void getNonExistingEditorial() throws Exception {
        // Get the editorial
        restEditorialMockMvc.perform(get("/api/editorials/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateEditorial() throws Exception {
        // Initialize the database
        editorialRepository.saveAndFlush(editorial);

        int databaseSizeBeforeUpdate = editorialRepository.findAll().size();

        // Update the editorial
        Editorial updatedEditorial = editorialRepository.findById(editorial.getId()).get();
        // Disconnect from session so that the updates on updatedEditorial are not directly saved in db
        em.detach(updatedEditorial);
        updatedEditorial
            .name(UPDATED_NAME);

        restEditorialMockMvc.perform(put("/api/editorials").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedEditorial)))
            .andExpect(status().isOk());

        // Validate the Editorial in the database
        List<Editorial> editorialList = editorialRepository.findAll();
        assertThat(editorialList).hasSize(databaseSizeBeforeUpdate);
        Editorial testEditorial = editorialList.get(editorialList.size() - 1);
        assertThat(testEditorial.getName()).isEqualTo(UPDATED_NAME);
    }

    @Test
    @Transactional
    public void updateNonExistingEditorial() throws Exception {
        int databaseSizeBeforeUpdate = editorialRepository.findAll().size();

        // Create the Editorial

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restEditorialMockMvc.perform(put("/api/editorials").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(editorial)))
            .andExpect(status().isBadRequest());

        // Validate the Editorial in the database
        List<Editorial> editorialList = editorialRepository.findAll();
        assertThat(editorialList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteEditorial() throws Exception {
        // Initialize the database
        editorialRepository.saveAndFlush(editorial);

        int databaseSizeBeforeDelete = editorialRepository.findAll().size();

        // Delete the editorial
        restEditorialMockMvc.perform(delete("/api/editorials/{id}", editorial.getId()).with(csrf())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Editorial> editorialList = editorialRepository.findAll();
        assertThat(editorialList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
