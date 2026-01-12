package com.youthconnect.youthconnect_id.controllers;

import com.youthconnect.youthconnect_id.models.Role;
import com.youthconnect.youthconnect_id.repositories.RoleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/roles")
public class RoleController {
    @Autowired
    private RoleRepository roleRepository;

    @GetMapping("/names")
    public List<String> getAllRoleNames() {
        return roleRepository.findAll()
                .stream()
                .map(Role::getRoleName)
                .collect(Collectors.toList());
    }
}
