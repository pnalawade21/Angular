USE [TestAngularDB]
GO
/****** Object:  StoredProcedure [dbo].[sp_UpdateProduct]    Script Date: 11/22/2019 4:43:46 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[sp_DeleteProduct]
	-- Add the parameters for the stored procedure here
	@ProductID AS INT	
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

	IF EXISTS(SELECT TOP 1 1 FROM Products WHERE ProductID = @ProductID)
	BEGIN
		DELETE FROM Products WHERE ProductID = @ProductID
	END
    
END
