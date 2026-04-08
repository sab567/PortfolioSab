import java.awt.*;
import javax.swing.*;

public class Calculatrice extends JFrame {
    private static final long serialVersionUID = 1L;
    private JTextField champNombreA, champNombreB;
    private JComboBox<String> choixOperation;
    private JLabel lblResultat;

    public Calculatrice() {
        try {
            UIManager.setLookAndFeel(UIManager.getSystemLookAndFeelClassName());
        } catch (Exception e) {
            e.printStackTrace();
        }

        setTitle("Calculatrice");
        setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        setSize(400, 200);
        setLocationRelativeTo(null);
        setLayout(new GridLayout(5, 2, 5, 5));

        ajouterComposants();

        setVisible(true);
    }

    private void ajouterComposants() {
        JLabel lblNombreA = new JLabel("Nombre 1 :", SwingConstants.RIGHT);
        champNombreA = new JTextField();
        add(lblNombreA);
        add(champNombreA);

        JLabel lblNombreB = new JLabel("Nombre 2 :", SwingConstants.RIGHT);
        champNombreB = new JTextField();
        champNombreB.addActionListener(e -> effectuerCalcul());
        add(lblNombreB);
        add(champNombreB);

        JLabel lblOperation = new JLabel("Opération :", SwingConstants.RIGHT);
        choixOperation = new JComboBox<>(new String[]{"+", "-", "*", "/"});
        add(lblOperation);
        add(choixOperation);

        JButton btnCalculer = new JButton("Calculer");
        btnCalculer.addActionListener(e -> effectuerCalcul());
        add(btnCalculer);

        lblResultat = new JLabel("Résultat :", SwingConstants.LEFT);
        add(lblResultat);

        JButton btnEffacer = new JButton("Effacer");
        btnEffacer.addActionListener(e -> reinitialiser());
        add(btnEffacer);
    }

    private void effectuerCalcul() {
        try {
            String entreeA = champNombreA.getText().trim();
            String entreeB = champNombreB.getText().trim();

            if (entreeA.isEmpty() || entreeB.isEmpty()) {
                JOptionPane.showMessageDialog(this, "Veuillez remplir tous les champs.", "Champs manquants", JOptionPane.WARNING_MESSAGE);
                return;
            }

            double nombreA = Double.parseDouble(entreeA);
            double nombreB = Double.parseDouble(entreeB);
            String operation = (String) choixOperation.getSelectedItem();
            double resultatCalcul = 0;

            switch (operation) {
                case "+": resultatCalcul = nombreA + nombreB; break;
                case "-": resultatCalcul = nombreA - nombreB; break;
                case "*": resultatCalcul = nombreA * nombreB; break;
                case "/":
                    if (nombreB == 0) {
                        JOptionPane.showMessageDialog(this, "Division par zéro interdite.", "Erreur", JOptionPane.ERROR_MESSAGE);
                        return;
                    }
                    resultatCalcul = nombreA / nombreB;
                    break;
            }

            if (resultatCalcul == (int) resultatCalcul) {
                lblResultat.setText("Résultat : " + (int) resultatCalcul);
            } else {
                lblResultat.setText("Résultat : " + resultatCalcul);
            }

        } catch (NumberFormatException ex) {
            JOptionPane.showMessageDialog(this, "Veuillez entrer uniquement des nombres.", "Erreur de saisie", JOptionPane.ERROR_MESSAGE);
        }
    }

    private void reinitialiser() {
        champNombreA.setText("");
        champNombreB.setText("");
        lblResultat.setText("Résultat :");
        choixOperation.setSelectedIndex(0);
        champNombreA.requestFocus();
    }

    public static void main(String[] args) {
        SwingUtilities.invokeLater(Calculatrice::new);
    }
}