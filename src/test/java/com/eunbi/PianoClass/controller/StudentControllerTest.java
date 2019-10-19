package com.eunbi.PianoClass.controller;

import com.eunbi.PianoClass.domain.Student;
import com.eunbi.PianoClass.repository.StudentRepository;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.sun.jndi.toolkit.url.Uri;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.json.JsonTest;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.data.jpa.mapping.JpaMetamodelMappingContext;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.util.UriComponentsBuilder;

import javax.transaction.Transactional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.BDDMockito.given;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@RunWith(SpringRunner.class)
@SpringBootTest
@AutoConfigureMockMvc
public class StudentControllerTest {

    @Autowired
    MockMvc mockMvc;

    ObjectMapper mapper = new ObjectMapper().findAndRegisterModules();

    @Test
    public void 학생_추가() throws Exception {
        String name = "조은비";
        String login = "hellobluejoy";
        Student expect = new Student(name,login);

        String response = studentAdd(name, login)
                .andExpect(status().isOk())
                .andReturn().getResponse().getContentAsString();

        Student student = mapper.readValue(response, Student.class);

        assertThat(student.getName()).isEqualTo(name);
        assertThat(student.getLogin()).isEqualTo(login);

    }

    private ResultActions studentAdd(String name, String login) throws Exception {

        return mockMvc.perform(MockMvcRequestBuilders.post("/api/v1/students")
                .param("name",name)
                .param("login", login)
        ).andDo(print());
    }

}
