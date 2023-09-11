package com.learnangular.usermanager.service;
import com.learnangular.usermanager.exceptions.UserNotFoundException;
import com.learnangular.usermanager.model.User;

import com.learnangular.usermanager.repo.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class UserService {
    private final UserRepo userRepo;
    @Autowired
    public UserService(UserRepo userRepo) {
        this.userRepo = userRepo;
    }
    public User addUser(User user){
        user.setUserCode(UUID.randomUUID().toString());
        return  userRepo.save(user);
    }

    public List<User> findAllUsers(){
        return userRepo.findAll();
    }
    public User updateUser(User user){
        return userRepo.save(user);
    }
    public void deleteUserById(Long id){
        userRepo.deleteById(id);
    }
    public User findUserById(Long id){
        return userRepo.findUserById(id)
                .orElseThrow(() -> new UserNotFoundException("User by ID "+id+ " not found"));
    }
}
