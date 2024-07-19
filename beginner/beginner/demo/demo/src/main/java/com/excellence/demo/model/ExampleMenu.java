package com.excellence.demo.model;

import java.time.LocalDate;

public class ExampleMenu {
    public final int id;

    public final String name;

    public int id() {
        return id;
    }

    public String name() {
        return name;
    }

    public static ExampleMenu empty() {
        return new ExampleMenu(0, "");
    }

    public ExampleMenu(int id, String name) {
        this.id = id;
        this.name = name;
    }
}
