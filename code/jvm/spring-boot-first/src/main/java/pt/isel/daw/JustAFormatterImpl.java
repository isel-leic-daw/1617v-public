package pt.isel.daw;

/**
 * Created by pedro on 28/03/17.
 */
public class JustAFormatterImpl implements Formatter {
    @Override
    public String format(String src) {
        return src.toUpperCase();
    }
}
