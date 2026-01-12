package com.youthconnect.youthconnect_id.services.implementation;

import com.youthconnect.youthconnect_id.models.Concern;
import com.youthconnect.youthconnect_id.models.dto.ConcernDTO;
import com.youthconnect.youthconnect_id.repositories.ConcernRepository;
import com.youthconnect.youthconnect_id.services.ConcernService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ConcernServiceImpl implements ConcernService {

    @Autowired
    private ConcernRepository concernRepository;

    @Override
    public Concern createConcern(ConcernDTO concernDTO) {
        Concern concern = new Concern();
        concern.setYouthId(concernDTO.getYouthId());
        concern.setTypeOfConcern(concernDTO.getTypeOfConcern());
        concern.setTitle(concernDTO.getTitle());
        concern.setDescription(concernDTO.getDescription());
        return concernRepository.save(concern);
    }

    @Override
    public List<Concern> getAllConcerns() {
        return concernRepository.findAll();
    }

    @Override
    public Optional<Concern> getConcernById(Integer id) {
        return concernRepository.findById(id);
    }

    @Override
    public List<Concern> getConcernsByYouthId(Integer youthId) {
        return concernRepository.findByYouthId(youthId);
    }

    @Override
    public List<Concern> getConcernsByStatus(String status) {
        return concernRepository.findByStatus(status);
    }

    @Override
    public Concern updateConcernStatus(Integer id, String status) {
        Optional<Concern> concernOpt = concernRepository.findById(id);
        if (concernOpt.isPresent()) {
            Concern concern = concernOpt.get();
            concern.setStatus(status);
            return concernRepository.save(concern);
        }
        return null;
    }

    @Override
    public void deleteConcern(Integer id) {
        concernRepository.deleteById(id);
    }
}