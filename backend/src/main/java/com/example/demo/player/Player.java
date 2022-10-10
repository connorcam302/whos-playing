package com.example.demo.player;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

@Entity
@Table
public class Player {
    @Id
    @SequenceGenerator(
        name = "player_sequence",
        sequenceName = "player_sequence",
        allocationSize = 1
    )
    @GeneratedValue(
        strategy = GenerationType.SEQUENCE,
        generator = "player_sequence"
    )
    private Long id;
    private String name;
    private Integer mainId;
    private Integer smurfId;

    public Player() {

    }
    
    public Player(String name, Integer mainId, Integer smurfId) {
        this.name = name;
        this.mainId = mainId;
        this.smurfId = smurfId;
    }

    public Player(String name, Integer mainId) {
        this.name = name;
        this.mainId = mainId;
    }

    public Long getId() {
        return id;
    }
    public void setId(Long id) {
        this.id = id;
    }
    public String getName() {
        return name;
    }
    public void setName(String name) {
        this.name = name;
    }
    public Integer getMainId() {
        return mainId;
    }
    public void setMainId(Integer mainId) {
        this.mainId = mainId;
    }
    public Integer getSmurfId() {
        return smurfId;
    }
    public void setSmurfId(Integer smurfId) {
        this.smurfId = smurfId;
    }
}
