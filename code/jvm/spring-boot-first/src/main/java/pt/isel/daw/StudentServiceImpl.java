package pt.isel.daw;

import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.datasource.DataSourceTransactionManager;
import org.springframework.jdbc.datasource.SingleConnectionDataSource;
import org.springframework.transaction.TransactionStatus;
import org.springframework.transaction.support.TransactionCallback;
import org.springframework.transaction.support.TransactionTemplate;

import java.sql.SQLException;

/**
 * Created by pedro on 31/03/17.
 */
public class StudentServiceImpl implements StudentsService {

    private final DataSourceTransactionManager transactionManager;

    public StudentServiceImpl(DataSourceTransactionManager transactionManager){

        this.transactionManager = transactionManager;
    }

    @Override
    public Student tryGetStudentByNumber(int number) {
        return number > 1000
                ? new Student("Alice", number)
                : null;
    }

    @Override
    public void doSomethingOnTransaction() {
        final JdbcTemplate jt;
        try {
            jt = new JdbcTemplate(
                    new SingleConnectionDataSource(transactionManager.getDataSource().getConnection(), false));
        } catch (SQLException e) {
            throw new RuntimeException();
        }
        jt.queryForObject("select count(*) from something", Integer.class);
    }
}
