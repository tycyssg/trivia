package com.trivia.controller;


import com.google.gson.Gson;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import javax.validation.Valid;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api")
public class UserController {

//    private final ActorsService actorsService;
//
//    @Autowired
//    public UserController(ActorsService actorsService) {
//        this.actorsService = actorsService;
//    }

//    @ResponseBody
//    @PostMapping(value = "/saveActor", consumes = "application/json", produces = "application/json")
//    public ResponseEntity<?> saveAction(@Valid @RequestBody ActorsAvailable actor, BindingResult bindingResult) {
//
//        if (bindingResult.hasErrors()) {
//            return new ResponseEntity<>( "Values cannot be null", HttpStatus.BAD_REQUEST);
//        }
//        return actorsService.saveActor(actor);
//    }
//
//    @ResponseBody
//    @PostMapping(value = "/saveMultipleActors", consumes = "application/json", produces = "application/json")
//    public ResponseEntity<?> saveMultipleActors(@Valid @RequestBody List<ActorsAvailable> actorsList, BindingResult bindingResult) {
//
//        if (bindingResult.hasErrors()) {
//            return new ResponseEntity<>( "Values cannot be null", HttpStatus.BAD_REQUEST);
//        }
//        return actorsService.saveMultipleActors(actorsList);
//    }

    @ResponseBody
    @GetMapping(value = "/hello", produces = "application/json")
    public ResponseEntity<?> getAllUrls() {
        return new ResponseEntity<>(new Gson().toJson("Hello World"),HttpStatus.OK);
    }

//    @GetMapping(value = "/getUrlById", produces = "application/json")
//    public ResponseEntity<ProjectUrl> getAllUrls(@RequestParam Integer urlId) {
//        if(urlId == null) return new ResponseEntity<>(null,HttpStatus.BAD_REQUEST);
//        return urlsService.getUrlById(urlId);
//    }
//
//
//    @ResponseBody
//    @DeleteMapping(value = "/deleteUrl/{urlId}", produces = "application/json")
//    public ResponseEntity<String> deleteNode(@PathVariable Integer urlId) {
//        if (urlId == null)
//            return new ResponseEntity<>(new Gson().toJson("Id is not present"), HttpStatus.BAD_REQUEST);
//
//        return urlsService.deleteUrl(urlId);
//    }


}
