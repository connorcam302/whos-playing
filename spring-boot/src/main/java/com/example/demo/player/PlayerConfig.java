package com.example.demo.player;

import java.util.List;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class PlayerConfig {

    @Bean
    CommandLineRunner commandLineRunner(PlayerRepository repository) {
        return args -> {
            Player colfox = new Player(
                    "Colfox",
                    294548916,
                    86619054);
            Player tifty = new Player(
                    "Tifty",
                    229886086,
                    100883262);
            Player bingham = new Player(
                    "Bingham",
                    80370391,
                    453182851);
            Player zirq = new Player(
                    "Zirq",
                    231268625,
                    161841881);
            Player tom = new Player(
                    "Richard Sweetly",
                    106505218);

            repository.saveAll(List.of(colfox, tifty,bingham,zirq,tom));
        };
    }
}
