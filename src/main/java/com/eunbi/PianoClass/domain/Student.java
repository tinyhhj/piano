package com.eunbi.PianoClass.domain;

import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

@Entity
@Table(name = "students",
        uniqueConstraints={
                @UniqueConstraint(
                        columnNames={"login"}
                )
        })
public class Student extends AuditModel {
    @Id
    @GeneratedValue(generator = "system-uuid")
    @GenericGenerator(name="system-uuid", strategy = "uuid")
    private String id;

    @NotNull
    @Size(max = 32, min = 2)
    private String name;
    private int age;

    @NotNull
    @Size(max = 32, min = 2)
    private String login;
    private String password;


    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getAge() {
        return age;
    }

    public void setAge(int age) {
        this.age = age;
    }

    public String getLogin() {
        return login;
    }

    public void setLogin(String login) {
        this.login = login;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public Student(@NotNull @Size(max = 32, min = 2) String name, @NotNull @Size(max = 32, min = 2) String login) {
        this.name = name;
        this.login = login;
    }

    public Student() {
    }

    public void clearPassword() {
        setPassword(null);
    }
}
