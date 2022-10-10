package com.example.demo.player;

import java.time.LocalDateTime;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.model.Response;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/v1/player")
@RequiredArgsConstructor
public class PlayerController {

    private final PlayerService playerService;

    @GetMapping("/all")
    public ResponseEntity<Response> getAllPlayers() {
        return ResponseEntity.ok(
                Response.builder()
                        .timeStamp(LocalDateTime.now())
                        .data(Map.of("players", playerService.getAllPlayers()))
                        .message("Players retrieved.")
                        .status(HttpStatus.OK)
                        .statusCode(HttpStatus.OK.value())
                        .build());
    }

    @GetMapping("/get/{id}")
    public ResponseEntity<Response> getPlayer(@PathVariable("id") Long id) {
        return ResponseEntity.ok(
                Response.builder()
                        .timeStamp(LocalDateTime.now())
                        .data(Map.of("players", playerService.getPlayer(id)))
                        .message("Players retrieved.")
                        .status(HttpStatus.OK)
                        .statusCode(HttpStatus.OK.value())
                        .build());
    }

    @PostMapping("/new")
    public ResponseEntity<Response>  registerNewPlayer(@RequestBody Player player) {
        return ResponseEntity.ok(
            Response.builder()
                    .timeStamp(LocalDateTime.now())
                    .data(Map.of("added", playerService.addNewPlayer(player)))
                    .message("Player " + player.getName() + " added.")
                    .status(HttpStatus.OK)
                    .statusCode(HttpStatus.OK.value())
                    .build());
    }

    @DeleteMapping("/delete/{playerId}")
    public ResponseEntity<Response> deletePlayer(@PathVariable("playerId") Long playerId) {
        playerService.deletePlayer(playerId);
        return ResponseEntity.ok(
            Response.builder()
                    .timeStamp(LocalDateTime.now())
                    .message("Player with ID: " + playerId + " deleted.")
                    .status(HttpStatus.OK)
                    .statusCode(HttpStatus.OK.value())
                    .build());
    }

    // @PutMapping(path = "{playerId}")
    // public void updatePlayer(
    // @PathVariable("playerId") Long playerId,
    // @RequestParam(required = false) String name,
    // @RequestParam(required = false) String email) {
    // playerService.updatePlayer(playerId, name, email);
    // }
}
