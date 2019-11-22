CREATE PROCEDURE sp_InsertProduct
	-- Add the parameters for the stored procedure here
	@ProductName AS VARCHAR(MAX),
	@ProductCost AS VARCHAR(MAX),
	@ManufacturerName AS VARCHAR(MAX),
	@ExpiryDate AS Date = NULL,
	@EffectiveDate AS Date = NULL
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    INSERT INTO Products (ProductName, ProductCost, ManufacturerName, EffectievDate, ExpiryDate) 
	VALUES(@ProductName, @ProductCost, @ManufacturerName, @EffectiveDate, @ExpiryDate)
END
GO
