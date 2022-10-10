package com.example.demo.player;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface PlayerRepository extends JpaRepository<Player, Long>{
    
    @Query("SELECT p FROM Player p WHERE p.mainId = ?1")
    Optional<Player> findPlayerByMainId(Integer mainId);

    @Query("SELECT p FROM Player p WHERE p.mainId = ?1")
    Optional<Player> findPlayerBySmurfId(Integer SmurfId);
}
