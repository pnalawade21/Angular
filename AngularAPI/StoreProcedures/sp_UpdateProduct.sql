USE [TestAngularDB]
GO
/****** Object:  StoredProcedure [dbo].[sp_InsertProduct]    Script Date: 11/22/2019 2:29:03 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
ALTER PROCEDURE [dbo].[sp_UpdateProduct]
	-- Add the parameters for the stored procedure here
	@ProductID AS INT,
	@ProductName AS VARCHAR(MAX) = NULL,
	@ProductCost AS VARCHAR(MAX) = NULL,
	@ManufacturerName AS VARCHAR(MAX) = NULL,
	@ExpiryDate AS Date = NULL,
	@EffectiveDate AS Date = NULL
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

	IF EXISTS(SELECT TOP 1 1 FROM Products WHERE ProductID = @ProductID)
	BEGIN
		UPDATE Products SET ProductName = @ProductName, ProductCost = @ProductCost, ManufacturerName = @ManufacturerName, EffectiveDate = @EffectiveDate, 
		ExpiryDate =@ExpiryDate WHERE ProductID = @ProductID
	END
    
END
