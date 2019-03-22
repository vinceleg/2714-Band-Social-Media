package ca.bcit.controllers;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.PreparedStatementCreator;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.util.Arrays;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import ca.bcit.Application;
import ca.bcit.beans.Band;

@Controller
@RequestMapping("/bands")
public class BandController {

    private static final Logger log = LoggerFactory.getLogger(Application.class);

    @Autowired
    private JdbcTemplate jdbcTemplate;

    private void addSampleData()
    {
        List<Object[]> splitUpNames = Arrays.asList("John Woo", "Jeff Dean", "Josh Bloch", "Josh Long").stream()
                .map(name -> name.split(" "))
                .collect(Collectors.toList());

        // Use a Java 8 stream to print out each tuple of the list
        splitUpNames.forEach(name -> log.info(String.format("Inserting bands record for %s %s", name[0], name[1])));

        // Uses JdbcTemplate's batchUpdate operation to bulk load data
        jdbcTemplate.batchUpdate("INSERT INTO bands(name, number_of_members, music_genre) VALUES (?,0, ?)", splitUpNames);

    }

    @GetMapping("")
    public ModelAndView getBands(){

        String sql = "SELECT * FROM bands";

        // example of querying with RowMapper
        List<Band> bandList = jdbcTemplate.query(
                sql,
                (rs, rowNum) -> new Band(rs.getLong("band_id"),
                        rs.getString("name"),
                        rs.getLong("number_of_members"),
                        rs.getString("music_genre"))
        );

        if(bandList.size() < 1)
        {
            addSampleData();
        }

        // example of querying with BeanPropertyRowMapper
        bandList = jdbcTemplate.query(
                sql,
                new BeanPropertyRowMapper<Band>(Band.class));

        log.info("Querying for bands records : "+ bandList.size());

        return new ModelAndView("band/bandlist").addObject("bands", bandList);
    }

    // open detail page
    @GetMapping("/{bandId}")
    public ModelAndView toDetail(@PathVariable String bandId){

        String sql = "SELECT * FROM bands where band_id = ?";

        Band band = jdbcTemplate.queryForObject(
                sql, new Object[]{bandId},
                new BeanPropertyRowMapper<Band>(Band.class));

        return new ModelAndView("band/bandDetail").addObject("band", band);
    }

    // open add page
    @GetMapping("/add")
    public ModelAndView toCreate(){
        return new ModelAndView("band/edit").addObject("band", new Band());
    }

    // open update page
    @GetMapping("/{bandId}/update")
    public ModelAndView toUpdate(@PathVariable String bandId){

        String sql = "SELECT * FROM bands where band_id = ?";
        Band band = jdbcTemplate.queryForObject(
                sql, new Object[]{bandId},
                new BeanPropertyRowMapper<Band>(Band.class));

        return new ModelAndView("band/edit").addObject("band", band);
    }

    // save Band data, if id is exist-update, else-insert
    @PostMapping("/save")
    public String save(@ModelAttribute Band band){

        log.info("Save bands record: " +  band);

        long bandId = band.getBandId();
        if(bandId != 0)
        {
            // Uses JdbcTemplate's batchUpdate operation to bulk load data
            jdbcTemplate.update("UPDATE bands SET name = ?, number_of_members = ?, music_genre = ? WHERE band_id = ? ",
                    band.getName(), band.getNumberOfMembers(), band.getMusicGenre(), bandId);

        } else {
            final String INSERT_SQL = "INSERT INTO bands(name, number_of_members, music_genre) VALUES (?, 0, ?)";
            final String name = band.getName();
            final String musicGenre = band.getMusicGenre();
//            jdbcTemplate.update(,INSERT_SQL, bandInfo.get("name"), bandInfo.get("musicGenre"));
            KeyHolder keyHolder = new GeneratedKeyHolder();
            jdbcTemplate.update(
                    new PreparedStatementCreator() {
                        public PreparedStatement createPreparedStatement(Connection connection) throws SQLException {
                            PreparedStatement ps =
                                    connection.prepareStatement(INSERT_SQL, new String[] {"band_id"});
                            ps.setString(1, name);
                            ps.setString(2, musicGenre);
                            return ps;
                        }
                    },
                    keyHolder);
            bandId = keyHolder.getKey().longValue();
        }

//        Map<String, String> response = new HashMap<String, String>();
//        response.put("result", "succeed");


//        String sql = "SELECT * FROM bands where name = ?"; // name should be unique
//        Band band = jdbcTemplate.queryForObject(
//                sql, new Object[]{bandInfo.get("name")},
//                new BeanPropertyRowMapper<Band>(Band.class));

        return "redirect:/bands/"+bandId;
    }

}