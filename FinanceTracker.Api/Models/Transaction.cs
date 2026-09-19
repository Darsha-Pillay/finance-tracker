using System.ComponentModel.DataAnnotations;

namespace FinanceTracker.Api.Models
{
    public class Transaction
    {
        public int Id { get; set; }

        // The Description property must have a valid value; it cannot be null or an
        // empty/whitespace string (depending on the type). The text passed into Description
        // cannot exceed 100 characters in length.
        [Required]
        [MaxLength(100)]
        public string Description { get; set; }

        [Range(0.01, double.MaxValue, ErrorMessage = "Amount must be greater than zero.")]
        public decimal Amount { get; set; }
        public TransactionType Type { get; set; }

        [Required]
        [MaxLength(50)]
        public string Category { get; set; } = string.Empty;
        public string DateTime { get; set; }

        /* an enum restricts a value to a fixed set of named options (Income or Expense only).
           EF Core will store this as an integer in PostgreSQL by default (0 = Income, 1 = Expense),
           but your C# code stays readable using the names. */
        public enum TransactionType
        {
            Income, // gets 0 automatically
            Expense// gets 1 automatically
        }

    }
}
