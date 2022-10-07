package model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.validation.constraints.NotEmpty;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class player {
    @Id 
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    @NotEmpty(message = "Name must not be null or empty")
    private String name;
    @NotEmpty(message = "IGN must not be null or empty")
    private String ign;
    @Column(unique = true)
    @NotEmpty(message = "Main ID must not be null or empty")
    private Long mainId;
    @Column(unique = true)
    private Long smurfId;
}
