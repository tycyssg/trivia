package com.trivia.controller;


import com.google.gson.Gson;
import com.trivia.jwt.JwtTokenProvider;
import com.trivia.model.Role;
import com.trivia.model.User;
import com.trivia.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.web.bind.annotation.*;
import java.security.Principal;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api")
public class UserController {


    private final JwtTokenProvider jwtTokenProvider;

    private final UserService userService;

    @Autowired
    public UserController(JwtTokenProvider jwtTokenProvider, UserService userService) {
        this.jwtTokenProvider = jwtTokenProvider;
        this.userService = userService;
    }

    @PostMapping("/registration")
    public ResponseEntity<?> register(@RequestBody User user){
        if(userService.findByUsername(user.getUsername()) != null){
            return new ResponseEntity<>(new Gson().toJson("USERNAME_EXIST"),HttpStatus.CONFLICT);
        }
        if(userService.findByEmail(user.getEmail()) != null){
            return new ResponseEntity<>(new Gson().toJson("EMAIL_EXIST"),HttpStatus.CONFLICT);
        }
        user.setRole(Role.USER);
        user.setScore(0L);
        userService.saveUser(user);
        return new ResponseEntity<>(new Gson().toJson("REGISTERED"), HttpStatus.CREATED);
    }

    @GetMapping("/login")
    public ResponseEntity<?> login(Principal principal){
        if(principal == null){
            //This should be ok http status because this will be used for logout path.
            return ResponseEntity.ok(principal);
        }
        UsernamePasswordAuthenticationToken authenticationToken = (UsernamePasswordAuthenticationToken) principal;
        User user = userService.findByUsername(authenticationToken.getName());
        user.setToken(jwtTokenProvider.generateToken(authenticationToken));
        return new ResponseEntity<>(user, HttpStatus.OK);
    }


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
