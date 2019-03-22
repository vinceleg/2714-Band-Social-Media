package ca.bcit.beans;


public class Band {

    private long bandId;
    private String name;
    private long numberOfMembers; // may comes from the SQL 'sum'
    private String musicGenre;

    public  Band()
    {

    }

    public Band(long bandId, String name, long numberOfMembers, String musicGenre) {
        this.bandId = bandId;
        this.name = name;
        this.numberOfMembers = numberOfMembers;
        this.musicGenre = musicGenre;
    }

    public long getBandId() {
        return bandId;
    }

    public void setBandId(long bandId) {
        this.bandId = bandId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public long getNumberOfMembers() {
        return numberOfMembers;
    }

    public void setNumberOfMembers(long numberOfMembers) {
        this.numberOfMembers = numberOfMembers;
    }

    public String getMusicGenre() {
        return musicGenre;
    }

    public void setMusicGenre(String musicGenre) {
        this.musicGenre = musicGenre;
    }

    @Override
    public String toString() {
        return "Band{" +
                "bandId=" + bandId +
                ", name='" + name + '\'' +
                ", numberOfMembers=" + numberOfMembers +
                ", musicGenre='" + musicGenre + '\'' +
                '}';
    }

}