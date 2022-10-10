package com.example.demo.player;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PlayerService {

    private final PlayerRepository playerRepository;

    @Autowired
    public PlayerService(PlayerRepository playerRepository) {
        this.playerRepository = playerRepository;
    }

    public List<Player> getPlayers() {
        return playerRepository.findAll();
    }

    public void addNewPlayer(Player player) {
        //Optional<Player> playerOptional = playerRepository.findPlayerByEmail(player.getEmail());
        Optional<Player> mainIdCheck = playerRepository.findPlayerByMainId(player.getMainId());
        if (mainIdCheck.isPresent()) {
            throw new IllegalStateException("MainID already exists.");
        }
        Optional<Player> smurfIdCheck = playerRepository.findPlayerByMainId(player.getMainId());
        if (smurfIdCheck.isPresent()) {
            throw new IllegalStateException("SmurfID already exists.");
        }
        playerRepository.save(player);
        System.out.println(player);
    }

    public void deletePlayer(Long playerId) {
        boolean exists = playerRepository.existsById(playerId);
        if (!exists) {
            throw new IllegalStateException("Player with ID " + playerId + " does not exist.");
        }
        playerRepository.deleteById(playerId);
    }

    // @Transactional
    // public void updatePlayer(Long playerId, String name, String mainId, String smurfId) {
    //     Player player = playerRepository.findById(playerId)
    //             .orElseThrow(() -> new IllegalStateException("Player with ID " + playerId + " does not exist"));

    //     if (name != null && name.length() > 0 && !Objects.equals(player.getName(), name)) {
    //         Optional<Player> playerOptional = playerRepository.findPlayerByEmail(email);
    //         if (playerOptional.isPresent()) {
    //             throw new IllegalStateException("Email is already registered.");
    //         }
    //         player.setEmail(email);
    //     }
    // }
}
