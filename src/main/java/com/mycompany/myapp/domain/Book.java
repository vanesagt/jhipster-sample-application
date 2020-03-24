package com.mycompany.myapp.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.Objects;
import java.util.HashSet;
import java.util.Set;

/**
 * A Book.
 */
@Entity
@Table(name = "book")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Book implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "title")
    private String title;

    @Column(name = "description")
    private String description;

    @OneToMany(mappedBy = "book")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Comentario> comentarios = new HashSet<>();

    @ManyToMany(mappedBy = "books")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @JsonIgnore
    private Set<Author> authors = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public Book title(String title) {
        this.title = title;
        return this;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public Book description(String description) {
        this.description = description;
        return this;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Set<Comentario> getComentarios() {
        return comentarios;
    }

    public Book comentarios(Set<Comentario> comentarios) {
        this.comentarios = comentarios;
        return this;
    }

    public Book addComentarios(Comentario comentario) {
        this.comentarios.add(comentario);
        comentario.setBook(this);
        return this;
    }

    public Book removeComentarios(Comentario comentario) {
        this.comentarios.remove(comentario);
        comentario.setBook(null);
        return this;
    }

    public void setComentarios(Set<Comentario> comentarios) {
        this.comentarios = comentarios;
    }

    public Set<Author> getAuthors() {
        return authors;
    }

    public Book authors(Set<Author> authors) {
        this.authors = authors;
        return this;
    }

    public Book addAuthors(Author author) {
        this.authors.add(author);
        author.getBooks().add(this);
        return this;
    }

    public Book removeAuthors(Author author) {
        this.authors.remove(author);
        author.getBooks().remove(this);
        return this;
    }

    public void setAuthors(Set<Author> authors) {
        this.authors = authors;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Book)) {
            return false;
        }
        return id != null && id.equals(((Book) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Book{" +
            "id=" + getId() +
            ", title='" + getTitle() + "'" +
            ", description='" + getDescription() + "'" +
            "}";
    }
}
